import Axios from 'axios';

class TastedivService {
  async getRecommendations(name: string) {
    const res = await Axios.get(`https://tastedive.com/api/similar?q=${name}`);
    return res.data;
  }
}

export default TastedivService;
