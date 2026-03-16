export function img(url: string) {

  if (!url || url === "") {
    return "https://res.cloudinary.com/demo/image/upload/sample.jpg"
  }

  return url.replace(
    "/upload/",
    "/upload/w_800,q_auto,f_auto/"
  )
}