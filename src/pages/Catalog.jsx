import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/api";
import CourseSlider from "../Components/core/Catalog/CourseSlider";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import CourseCard from "../Components/core/Catalog/CourseCard";

const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  //fetch all categories
  //jb bhi naya url banra ye call hoga
  useEffect(() => {
    const getCategories = async () => {
      const response = await apiConnector("Get", categories.CATEGORIES_API);
      const category_id = response?.data?.data?.filter(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id;
      setCategoryId(category_id);
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        console.log("PRinting res: ", res);
        setCatalogPageData(res);
      } catch (error) {
        console.log(error);
      }
    };
    //iske karan issue aarha tha objectId ka
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  return (
    <div className="text-white ">
      <div>
        <p>
          {`Home/Catalog/`}
          <span>{catalogPageData?.data?.selectedCategory?.name}</span>
        </p>
        <p>{catalogPageData?.data?.selectedCategory?.name}</p>
        <p>{catalogPageData?.data?.selectedCategory?.description}</p>
      </div>

      <div>
        {/* Section 1 */}

        <div>
          <div>Courses to get you started</div>
          <div className="flex gap-x-3">
            <p>Most Popular</p>
            <p>New</p>
          </div>
          <CourseSlider
            courses={catalogPageData?.data?.selectedCategory?.course}
          />
        </div>

        {/* Section 2 */}

        <div>
          <p>Top Courses in {catalogPageData?.data?.selectedCategory?.name}</p>
          <div>
            <CourseSlider
              courses={catalogPageData?.data?.differentCategory?.course}
            />
          </div>
        </div>

        {/* Section 3 */}

        <div>
          <p>Frequently Bought</p>
          <div className="py-8 ">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {catalogPageData?.data?.mostSellingCourses
                ?.slice(0, 4)
                .map((course, index) => (
                  <CourseCard
                    course={course}
                    key={index}
                    height={"h-[400px]"}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default Catalog;
