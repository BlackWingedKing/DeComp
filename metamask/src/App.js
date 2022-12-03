import { Uploading } from "./Uploading";
import { useMetamask } from "./useMetamask";
import Card from "./Card";

function App() {
  const {
    accountAddress,
    accountBalance,
    isConnected,
    connectWallet,
    addMethod,
  } = useMetamask();

  return (
    <div className="flex min-h-screen">
      {isConnected ? (
        <div className="m-auto flex gap-8 items-center">
          <Card
            address={
              accountAddress.slice(0, 9) + "..." + accountAddress.slice(34, 42)
            }
            balance={accountBalance}
          />
          <Uploading addMethod={addMethod} />
        </div>
      ) : (
        <div className="m-auto flex flex-col items-center">
          <button
            className="cursor-pointer	p-4 border-solid border-black border-2 w-64 rounded-lg mt-10 font-medium"
            onClick={connectWallet}
          >
            Connect
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
