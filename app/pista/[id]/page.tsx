import PistaCliente from "./PistaCliente"

export default async function PistaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <PistaCliente id={parseInt(id)} />
}