export const createImageUrl = (url: string) => {
  return `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/${url}`
}
