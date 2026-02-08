import {useState} from 'react';
import { Link } from 'react-router-dom';
import {useMyProducts} from "@/hooks/product/useMyProducts.js";
import {useCategoryLookup} from '@/hooks/category/useCategoryLookup.js'
import MyProductList from "@/components/my-page/products/my-product-list/MyProductList.jsx";
import Pagination from "@/components/common/pagination/Pagination.jsx";
import SearchFilter from "@/components/common/search/SearchFilter.jsx";

const MyProducts = ({decoded}) => {
    const [params, setParams] = useState({
        title: "",
        path: "",
        page: 0,
        size: 5,
        sort: ""
    });

    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime){
        return null;
    }

    const { data: myProducts } = useMyProducts(decoded.sub, params);
    const { data: lookup = {} } = useCategoryLookup();

    const productsAndAuctions = myProducts?.data?.content?.map(product => product);
    const lastCategoryId = params?.path ? params.path.split('/').pop() : "";
    const categoryName = lookup[String(lastCategoryId)]?.name || "전체 카테고리";

    return (
        <div style={{
            minHeight: "85vh",
            display: "flex",
            flexDirection: "column",
        }}>
            <SearchFilter
                params={params}
                setParams={setParams}
                categoryName={categoryName}
            />
            {myProducts?.data?.content?.length > 0 ? (
                <MyProductList productsAndAuctions={productsAndAuctions} params={params} setParams={setParams}/>
            ) : (
                <>
                    <div className="empty-container">
                        <div className="empty-message">
                            아직 등록한 경매가 없습니다. <br/>
                            경매를 등록해보세요!
                        </div>
                        <Link to="/product-add" className="btn-black">
                            경매 등록 하러가기
                        </Link>
                    </div>
                </>
            )
            }
            <div style={{ marginTop: 'auto' }}>
                <Pagination pageInfo={{totalPages: myProducts?.data?.totalPages, number: myProducts?.data?.number}} setParams={setParams} />
            </div>
        </div>
    );
}

export default MyProducts;