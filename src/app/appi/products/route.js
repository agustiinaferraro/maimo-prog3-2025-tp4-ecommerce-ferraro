export async function GET() {
  const products = [
    {
      id: 1,
      title: "X",
      year: 2019,
      overview: "Primer álbum de The Driver Era, con sonidos pop y rock.",
      poster_path: "/disco1-vertical.jpg",
      backdrop_path: "/disco1-horizontal.jpg",
      songs: [
        {
          id: 101,
          title: "Preacher Man",
          isSingle: true,
          video: "/videos/preacher-man.mp4",
          poster_path: "/songs/preacher-man-vertical.jpg",
          backdrop_path: "/songs/preacher-man-horizontal.jpg"
        },
        {
          id: 102,
          title: "Low",
          isSingle: false,
          poster_path: "/songs/low-vertical.jpg",
          backdrop_path: "/songs/low-horizontal.jpg"
        }
      ]
    }
  ];

  return Response.json({ results: products });
}