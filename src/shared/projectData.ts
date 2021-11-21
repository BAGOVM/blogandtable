export const postsUrl = 'https://61993e899022ea0017a7aded.mockapi.io/Posts/';


interface IPost{
  id: number;
  title: string;
  description: string;
  liked: boolean;
}

export const posts: IPost[] = [
  {
    id: 1,
    title: "Post 1",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, fugiat harum. Voluptatibus beatae corrupti nulla, qui odit mollitia doloremque rerum magni rem aut laborum, maiores officiis laboriosam hic. Ratione, voluptas?",
    liked: false,
  },
  {
    id: 2,
    title: "Post 2",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, fugiat harum. Voluptatibus beatae corrupti nulla, qui odit mollitia doloremque rerum magni rem aut laborum, maiores officiis laboriosam hic. Ratione, voluptas?",
    liked: false,
  },
  {
    id: 3,
    title: "Post 3",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, fugiat harum. Voluptatibus beatae corrupti nulla, qui odit mollitia doloremque rerum magni rem aut laborum, maiores officiis laboriosam hic. Ratione, voluptas?",
    liked: false,
  },
];
