export interface Post {
    id?: any;
    title: string;
    body: string;
  }
  
  export interface State {
    data: Post[];
  }
  
  export interface Action {
    type: string;
    payload?: any;
    value?: any;
  }
  
  export interface PostContextType {
    state: { data: Post[] };
    dispatch: React.Dispatch<Action>;
    editPost: Post;
    setEditPost: React.Dispatch<React.SetStateAction<{}>>;
    addPost: Post;
    setAddPost: React.Dispatch<React.SetStateAction<{}>>;
    fetchData: () => void;
    handleSave: (e: any) => void;
    editData: () => void;
    deleteData: (itemId: string) => void;
    mode: {};
    setMode:  React.Dispatch<React.SetStateAction<{}>>;
   
  }
  