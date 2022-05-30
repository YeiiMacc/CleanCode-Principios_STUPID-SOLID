import { PhotosService, PostService, TodoService } from './2.OpenCloseB';
import { HttpClient } from './2.OpenCloseC';

(async () => {

    const httpClient = new HttpClient();

    const todoService = new TodoService(httpClient);
    const postService = new PostService(httpClient);
    const photosService = new PhotosService(httpClient);

    const todos = await todoService.getTodoItems();
    const posts = await postService.getPosts();
    const photos = await photosService.getPhotos();
    
    
    console.log({ todos, posts, photos });
    

})();