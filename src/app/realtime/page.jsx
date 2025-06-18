import RealTime from "@/components/realtime";

const RealTimePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Real-Time Data</h1>
      <RealTime />
    </div>
  );
}
export default RealTimePage;