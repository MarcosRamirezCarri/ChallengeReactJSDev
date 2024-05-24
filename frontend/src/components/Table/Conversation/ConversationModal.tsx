interface ConsverProp {
  setOpen: any;
  open: boolean;
  conversation: any;
  id: number;
}

const ConversationModal: React.FC<ConsverProp> = ({
  setOpen,
  open,
  conversation,
  id,
}) => {
  console.log(conversation);

  return (
    <div
      onClick={() => setOpen(!open)}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-black-950/[0.1]" : "invisible"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white w-[50%] gap-3 rounded-xl flex flex-col shadow p-6 transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <p className="self-center text-xl font-semibold">
          Conversacion Caso nº: {id}
        </p>
        <button
          onClick={() => setOpen(!open)}
          className="absolute top-2 text-2xl right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          x
        </button>
        <div className="flex flex-col gap-2 bg-black-100/[0.9] p-4 rounded-md shadow-inset">
          {conversation.map((a: any, index: any) => (
            <div key={index} className="flex flex-col gap-1 ">
              <p className="text-xl font-medium">Fecha: {a.time}</p>
              <p className="text-lg font-notmal">- {a.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationModal;
