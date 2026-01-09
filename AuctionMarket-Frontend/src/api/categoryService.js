import api from "./axios.js";

export const categoryService = {
    // 전체 카테고리 트리 가져오기
    getAllCategories: () => {
        return api.get('/category')
    }
};