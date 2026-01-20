import { useCategory } from "./useCategory.js";

export const useCategoryLookup = () => {
    return useCategory({
        select: (rawCategories) => {
            const lookup = {};
            const flatten = (list) => {
                list.forEach(cat => {
                    lookup[String(cat.categoryId)] = { name: cat.category, parentId: cat.parentId };
                    if (cat.children) flatten(cat.children);
                });
            };
            flatten(rawCategories);
            return lookup;
        }
    });
};