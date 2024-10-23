import cn from "../../../../utils/cn";

const DefaultMessage = () => (
  <section className={cn("flex justify-start")}>
    <main className="max-w-[90%]">
      <p className="bg-slate-200 text-black px-3 py-2 rounded-xl">
        Hallo, wie kann ich Dir helfen?
      </p>
    </main>
  </section>
);

const ChatWelcome = () => {
  return (
    <div className="h-full w-full space-y-6 px-4 overflow-y-auto modern-scrollbar py-4">
      <DefaultMessage />
    </div>
  );
};

export { DefaultMessage };
export default ChatWelcome;
