import { createClient } from 'pexels';

const pexelsClient = createClient('FL2dxlrKiFxD7bUixuYfDzuEtCfsW9hPXfg748zfKGO79bZ12f2m1PpH');

const fetchImages = async (query, page = 1, perPage = 20) => {
    try {
      const response = await pexelsClient.photos.search({
        query: query,
        page,
        per_page: perPage,
      });
      return response.photos;
    } catch (error) {
      console.error('Error fetching images:', error);
    }
};

export default fetchImages;