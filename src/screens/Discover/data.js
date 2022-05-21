export default Array.from({ length: 18 }).map((__, id) => ({
  id,
  title: 'The Rise of a Great Army',
  author: 'Pst. Ayoola Jolayemi',
  image: `https://source.unsplash.com/300x200?artist,id${id}`,
  time: '46.59',
}));
