export default function TableRow({ children }: { children: React.ReactNode }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      {children}
    </tr>
  );
}
