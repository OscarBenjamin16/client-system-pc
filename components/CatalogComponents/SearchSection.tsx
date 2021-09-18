import React, { useState, useEffect, SetStateAction } from "react";
import { ChangeEventHandler } from "react";
import { Category, Mark } from "../../interfaces/mc";
import { Pagination, Product } from "../../interfaces/product";
import {
  getProductbyCategory,
  getProductbyMark,
} from "../../services/catalog.service";
import { getCategories, getMarks } from "../../services/mc.service";

interface Props {
  setProducts: React.Dispatch<
    SetStateAction<[Product] | undefined | null | Product[]>
  >;
  setPagination: React.Dispatch<SetStateAction<Pagination | undefined>>;
  rangePagination: Function;
  getOfert: Function;
}

const SearchSection = (props: Props) => {
  const [marks, setMarks] = useState<[Mark]>();
  const [categories, setCategories] = useState<[Category]>();
  const getValues = () => {
    getMarks().then((res) => {
      const marks: [Mark] = res.marca.filter((mark: Mark) => mark.status === true);
      setMarks(marks);
    });
    getCategories().then((res) => {
      const categories: [Category] = res.categoria.filter(
        (cat: Category) => cat.status === true
      );
      setCategories(categories);
    });
  };
  const onChangeMark: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const mark = e.currentTarget.value;
    getProductbyMark(Number(mark)).then((res) => {
      if (!res.ok) {
        props.setProducts(null);
        return;
      }
      console.log(res);
      const product: [Product] = res.producto.filter(
        (prod: Product) => prod.status === true
      );
      props.setProducts(product);
      props.setPagination({
        nextPage: res.nextPage,
        prevPage: res.prevPage,
        currentPage: res.currentPage,
        totalPages: res.totalPages,
      });
      props.rangePagination(1, res.totalPages);
    });
  };
  const onChangeCategory: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const cat = e.currentTarget.value;
    getProductbyCategory(Number(cat)).then((res) => {
      if (!res.ok) {
        props.setProducts(null);
        return;
      }
      if (res.ok) {
        const product: [Product] = res.producto.filter(
          (prod: Product) => prod.status === true
        );
        props.setProducts(product);
        props.setPagination({
          nextPage: res.nextPage,
          prevPage: res.prevPage,
          currentPage: res.currentPage,
          totalPages: res.totalPages,
        });
        props.rangePagination(1, res.totalPages);
        return;
      }
      props.setProducts(undefined);
      props.setPagination(undefined);
    });
  };
  useEffect(() => {
    getValues();
  }, []);
  return (
    <ul>
      <li>
        <select
          defaultValue={"DEFAULT"}
          onChange={onChangeCategory}
          className="w-full border border-t-0 border-r-0 border-l-0 text-sm lg:px-4 mt-4 cursor-pointer focus:outline-none"
        >
          <option value={"DEFAULT"} disabled>
            Categorias
          </option>
          {categories?.map((cat) => (
            <option value={cat.id} key={cat.id}>
              {cat.categoria}
            </option>
          ))}
        </select>
      </li>
      <li>
        <select
          onChange={onChangeMark}
          defaultValue={"DEFAULT"}
          className="w-full border text-sm border-t-0 border-r-0 border-l-0 lg:px-4 mt-4 cursor-pointer focus:outline-none"
        >
          <option value={"DEFAULT"} disabled>
            Marcas
          </option>
          {marks?.map((mark) => (
            <option value={mark.id} key={mark.id}>
              {mark.marca}
            </option>
          ))}
        </select>
      </li>
      <li
        onClick={() => props.getOfert()}
        className="border text-sm border-t-0 border-r-0 border-l-0 lg:px-4 mt-4 cursor-pointer"
      >
        Ofertas
      </li>
    </ul>
  );
};

export default SearchSection;
