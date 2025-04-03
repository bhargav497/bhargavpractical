export type videoDataType = {
  id: number,
  videoUrl: string,
  description: string,
  likes: string,
  comments: string,
  user: userDataType
};

export type userDataType = {
  username: string,
  profilePic: string
};
