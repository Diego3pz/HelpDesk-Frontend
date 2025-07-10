

interface Props {
  children: React.ReactNode;
}

export default function layout({ children }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg flex w-full max-w-4xl overflow-hidden">

        <div className="hidden md:flex flex-col items-center justify-center bg-blue-600 w-1/2 p-10">
          <img src="/images/logo.png" alt="Logotipo" width={80} height={80} className="mb-4" />
          <p className="text-blue-100 mt-2 text-center">Gestión de tickets y soporte</p>
        </div>
        <div className="flex-1 flex flex-col justify-center p-8">
          {children}
        </div>
      </div>
    </div>
  );
}