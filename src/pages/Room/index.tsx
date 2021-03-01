import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  MouseEvent,
  FormEvent,
} from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { CirclePicker } from 'react-color';
import { FiTrash, FiArrowRight } from 'react-icons/fi';
import ReactTooltip from "react-tooltip";

import api from '../../services/api';
import io from 'socket.io-client';
import { useAuth } from '../../hooks/Auth';

import Container from '../../components/Container';

import {
  DrawArea,
  ToolBar,
  InputViewColor,
  SliderSize,
  BtnClearDrawArea,
  Chat,
  InputMessage,
  WordFind,
  TimerBar
} from './styles';

interface RoomProps {
  id_room: string;
}

interface SizeDrawArea {
  with: number,
  height: number,
}

interface Line {
  id_room: string;
  color: string;
  size: number;
  nextPos: {
    x: number;
    y: number;
  };
  lastPos: {
    x: number;
    y: number;
  };
}

interface Brush {
  isActive: boolean;
  isMoved: boolean;
  color: string;
  size: number;
  nextPos: {
    x: number;
    y: number;
  };
  lastPos: {
    x: number;
    y: number;
  } | null;
}

interface Message {
  id: string;
  id_room: string;
  user: string;
  message: string;
}

let socket : any;

const Room: React.FC = () => {
  const history = useHistory();
  const { params } = useRouteMatch<RoomProps>();
  const { id_room } = params;
  const { user } = useAuth();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chatRef = useRef<HTMLDivElement>(null)

  const sizeDrawArea: SizeDrawArea = {
    with: 720,
    height: 460,
  };

  const colors = [
    "#fff",    "#656565", "#000",
    "#ff0015", "#ff6201", "#ff9201",
    "#fff700", "#00ff01", "#00af01",
    "#003c00", "#01ffe5", "#00a3ff",
    "#007ad0", "#0013fe", "#8200ff",
    "#6200ff", "#fe00ea", "#fe008d"
  ];

  const [brush, setBrush] = useState<Brush>({
    isActive: false,
    isMoved: false,
    color: 'black',
    size: 2,
    nextPos: { x: 0, y: 0 },
    lastPos: null,
  });

  const [color, setColor] = useState(brush.color);

  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const [isDraw, setIsDraw] = useState(true);
  const [isDiscover, setIsDiscover] = useState(true);
  const [wordFind, setWordFind] = useState('');
  const [wordCorrect, setWordCorrect] = useState('');
  const [percentTimer, setPercentTimer] = useState(100);

  const HandleOnMouseDown = useCallback(() => {
    setBrush((prev) => Object.assign(prev, { isActive: true }));
  }, []);

  const HandleOnMouseUp = useCallback(() => {
    setBrush((prev) => Object.assign(prev, { isActive: false }));
  }, []);

  const HandleOnMouseMove = useCallback((event: MouseEvent) => {
    const boundingRect = canvasRef.current?.getBoundingClientRect();
    if (boundingRect) {
      const x = event.clientX - boundingRect.left;
      const y = event.clientY - boundingRect.top;

      setBrush((prev) =>
        Object.assign(prev, {
          nextPos: {
            x,
            y,
          },
          isMoved: true,
        }),
      );
    }
  }, []);

  const DrawLine = useCallback((line: Line) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.save();
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.lineWidth = line.size;
      ctx.strokeStyle = line.color;
      ctx.globalCompositeOperation = 'source-over';
      ctx.moveTo(line.lastPos.x, line.lastPos.y);
      ctx.lineTo(line.nextPos.x, line.nextPos.y);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }
  }, []);

  const HandleChangeColor = useCallback((color) => {
    setColor(color.hex);
    setBrush((prev) => Object.assign(prev, { color: color.hex }));
  }, []);

  const HandleChangeSize= useCallback((event: any, newValue: number | number[]) => {
    setBrush((prev) => Object.assign(prev, { size: newValue } ));
  }, []);

  const cycle = useCallback(() => {
    if (brush.isActive && brush.isMoved && brush.lastPos) {
      const line: Line = {
        id_room,
        color: brush.color,
        size: brush.size,
        nextPos: brush.nextPos,
        lastPos: brush.lastPos
      };
      socket.emit('draw', line )
      setBrush((prev) => Object.assign(prev, { isMoved: false }));
    }

    setBrush((prev) =>
      Object.assign(prev, {
        lastPos: {
          x: brush.nextPos.x,
          y: brush.nextPos.y,
        },
      }),
    );

    setTimeout(() => cycle(), 30);
  }, [brush, id_room]);

  const HandleClickClearDrawArea = useCallback(() => {
    socket.emit('clearDrawArea', id_room);
  }, [id_room]);

  const ClearDrawArea = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, sizeDrawArea.with, sizeDrawArea.height);
    }
  }, [sizeDrawArea]);

  const DrawAllLinesToRoom = useCallback(async () => {
    const response = await api.get(`/rooms/${id_room}/lines`);

    const lines: Line[] = response.data;

    lines.forEach(line => {
      DrawLine(line);
    });
  }, [DrawLine, id_room]);

  const HandleSendMessage = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(newMessage) {
      const message: Message = {
        id: '',
        id_room,
        user: user.name,
        message: newMessage,
      }

      socket.emit('sendMessage', message);

      setNewMessage('');
    }
  }, [newMessage, id_room, user]);

  const ReceiveMessage = useCallback((message) => {
    setMessages((prev) => [...prev, message]);

    if(chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, []);

  const ReceiveAllMessages = useCallback(async () => {
    const response = await api.get(`rooms/${id_room}/messages`);

    const messages: Message[] = response.data;
    setMessages(messages);

    if(chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [id_room])

  // const ToDraw = useCallback((data:any) => {
  //   console.log('Vc desenha');
  //   setIsDraw(true);
  //   setWordCorrect(data.word);
  // }, []);

  // const StartGame = useCallback((data: any) => {
  //   console.log(`startGame`);
  //   console.log(isDraw);
  //   if(isDraw === false){
  //     setIsDiscover(true);
  //     setWordFind(data.word);
  //   }
  // }, [isDraw]);

  // const EndGame = useCallback((data:any) => {
  //   console.log(`endGame`);
  //   setIsDraw(false);
  //   setIsDiscover(false);
  //   console.log(data.word);
  //   setWordCorrect(data.word);
  // }, []);

  const init = useCallback((socket) => {
    socket.on('connectionSuccess', () => {
      socket.emit('enterToRoom', id_room);
    });

    socket.on('enterToRoomSuccess', () => {
      DrawAllLinesToRoom();
      ReceiveAllMessages();
    });

    socket.on('enterToRoomError', () => {
      history.push('/notfound');
    });

    socket.on('draw', (line: Line) => {
      DrawLine(line);
    });

    socket.on('clearDrawArea', ClearDrawArea);

    socket.on('sendMessage', ReceiveMessage);

    // socket.on('toDraw', ToDraw);

    socket.on('timerPreGame', (data: any) => {
      console.log(`timerGame: ${data.interval}`);
    });

    // socket.on('startGame', StartGame);

    socket.on('timerGame', (data: any) => {
      console.log(`timerGame: ${data.interval}`);
      setPercentTimer(data.interval);
    });

    // socket.on('endGame', EndGame);

    cycle();
  }, [isDraw, history, ReceiveMessage, ClearDrawArea, DrawAllLinesToRoom, ReceiveAllMessages]);

  useEffect(() => {
    socket = io('http://localhost:3333');
    init(socket);
  }, []);

  return (
    <>
      <Container flex={true}>
        <ToolBar>
          { isDraw &&
            <>
              <InputViewColor
                initialValue="#000"
                onChange={HandleChangeColor}
                placement="right"/>
              <CirclePicker colors={colors} color={color} onChange={HandleChangeColor} />
              <SliderSize
                min={1}
                max={30}
                onChange={HandleChangeSize}/>
            </>
          }

          <Chat isDraw={isDraw}>
            <div ref={chatRef}>
              { messages.map((message) => (
                <p key={message.id}><strong>{message.user}:</strong> {message.message}</p>
              ))}
            </div>
            { (isDraw || isDiscover) &&
              <InputMessage onSubmit={HandleSendMessage}>
                <input
                  placeholder="Enviar Messagem"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit"> <FiArrowRight size={25}/> </button>
              </InputMessage>
            }
          </Chat>
        </ToolBar>

        <DrawArea
          width={sizeDrawArea.with}
          height={sizeDrawArea.height}
          ref={canvasRef}
          onMouseDown={HandleOnMouseDown}
          onMouseUp={HandleOnMouseUp}
          onMouseMove={HandleOnMouseMove}
        />
        <BtnClearDrawArea data-tip="Limpar Tela" onClick={HandleClickClearDrawArea}>
          <FiTrash size={30}/>
        </BtnClearDrawArea>
        <ReactTooltip place="left" effect="solid"/>
        <WordFind>
            <p>{(wordCorrect ? wordCorrect : wordFind)}</p>
        </WordFind>
        {/* <TimerBar timePercent={percentTimer}>
          <div></div>
        </TimerBar> */}
      </Container>
    </>
  );
};

export default Room;
