import { useState, useEffect, useMemo } from 'react';
import ProductCard from '../ProductCard';
import styles from './ProductTypePage.module.scss';
import Icon from '../Icon';
import { Icons, SortType, IProductDetails } from '../../types';
import { useProductsSelector } from '../../hooks/reduxHooks';
import { CustomSelect } from '../CustomSelect/CustomSelect';

type Props = {
  productsType: 'phones' | 'tablets' | 'accessories';
};

const sortOptions = [
  { value: SortType.WITHOUT_SORT, label: 'Without Sort' },
  { value: SortType.AZ, label: 'A to Z' },
  { value: SortType.ZA, label: 'Z to A' },
  { value: SortType.LOW_TO_HIGH, label: 'Lowest Price' },
  { value: SortType.HIGH_TO_LOW, label: 'Highest Price' },
  { value: SortType.NEWEST_TO_OLDEST, label: 'Newest' },
  { value: SortType.OLDEST_TO_NEWEST, label: 'Oldest' },
];

const itemsPerPageOptions = [
  { value: 8, label: '8' },
  { value: 16, label: '16' },
  { value: 24, label: '24' },
  { value: 32, label: '32' },
  { value: Number.MAX_SAFE_INTEGER, label: 'All' },
];

import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import {
  convertToProductDetails,
  convertToProductT,
} from '../../utils/helpers';

export default function ProductTypePage({ productsType }: Props) {
  const { allProducts } = useProductsSelector(state => state);
  const filteredProducts = allProducts.filter(
    product => product.category === productsType,
  );

  let pageTitle = '';

  switch (productsType) {
    case 'phones':
      pageTitle = 'Mobile Phones';
      break;
    case 'tablets':
      pageTitle = 'Tablets';
      break;
    case 'accessories':
      pageTitle = 'Accessories';
      break;
  }

  const params = useMemo(() => new URLSearchParams(window.location.search), []);

  const [currentPage, setCurrentPage] = useState(() => {
    return Number(params.get('page')) || 1;
  });

  const [itemsPerPage, setItemsPerPage] = useState(() => {
    return Number(params.get('itemsPerPage')) || 16;
  });

  const [sortType, setSortType] = useState<SortType>(() => {
    return (params.get('sort') as SortType) || SortType.WITHOUT_SORT;
  });

  const sortProducts = (
    products: IProductDetails[],
    sortTypeParam: SortType,
  ) => {
    const sortedProducts = [...products];

    switch (sortTypeParam) {
      case SortType.AZ:
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortType.ZA:
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case SortType.LOW_TO_HIGH:
        sortedProducts.sort((a, b) => a.priceDiscount - b.priceDiscount);
        break;
      case SortType.HIGH_TO_LOW:
        sortedProducts.sort((a, b) => b.priceDiscount - a.priceDiscount);
        break;
      case SortType.NEWEST_TO_OLDEST:
        sortedProducts.sort((a, b) => Number(b.year) - Number(a.year));
        break;
      case SortType.OLDEST_TO_NEWEST:
        sortedProducts.sort((a, b) => Number(a.year) - Number(b.year));
        break;
      case SortType.WITHOUT_SORT:
        return products;
      default:
        break;
    }

    return sortedProducts;
  };

  const convertedProducts = filteredProducts.map(convertToProductDetails);
  const sortedProducts = sortProducts(convertedProducts, sortType);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const pagination = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 4;

    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPagesToShow / 2, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <span
          key={i}
          onClick={() => pagination(i)}
          className={
            currentPage === i
              ? `${styles.active} ${styles.pageNumber}`
              : styles.pageNumber
          }
          onMouseEnter={e => e.currentTarget.classList.add(styles.hover)}
          onMouseLeave={e => e.currentTarget.classList.remove(styles.hover)}
        >
          {i}
        </span>,
      );
    }

    return pageNumbers;
  };

  const handleSortChange = (value: number | SortType | undefined) => {
    if (typeof value === 'number' || typeof value === 'string') {
      setSortType(value as SortType);
      setCurrentPage(1);
    }
  };

  const handleItemsPerPageChange = (value: number | SortType | undefined) => {
    if (typeof value === 'number') {
      setItemsPerPage(value);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    params.set('sort', sortType);
    params.set('itemsPerPage', itemsPerPage.toString());
    params.set('page', currentPage.toString());
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params}`,
    );
  }, [sortType, itemsPerPage, currentPage, params]);

  return (
    <main className={styles.phonesPage}>
      <Breadcrumbs />
      <h1 className={styles.title}>{pageTitle}</h1>
      <span className={styles.subText}>{filteredProducts.length} models</span>
      <div className={styles.filterWrapper}>
        <div className={styles.filter}>
          <label className={styles.label} htmlFor="sort">
            Sort by:
          </label>
          <CustomSelect
            options={sortOptions}
            value={sortType}
            onChange={handleSortChange}
            className="my-custom-select"
          />
        </div>
        <div className={styles.filter}>
          <label className={styles.label} htmlFor="itemsPerPage">
            Items per page:
          </label>
          <CustomSelect
            options={itemsPerPageOptions}
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="my-custom-select"
          />
        </div>
      </div>
      <div className={styles.cardsContainer}>
        {currentItems.map(product => (
          <ProductCard key={product.id} product={convertToProductT(product)} />
        ))}
      </div>
      <div className={styles.pageSelector}>
        <Icon
          iconId={Icons.ARROW_LEFT}
          className={`${styles.arrowLeft} ${currentPage === 1 ? styles.disabled : ''}`}
          onClick={() => pagination(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {renderPageNumbers()}
        <Icon
          iconId={Icons.ARROW_RIGHT}
          className={`${styles.arrowRight} ${
            currentPage === totalPages || currentItems.length === 0
              ? styles.disabled
              : ''
          }`}
          onClick={() => pagination(currentPage + 1)}
          disabled={currentPage === totalPages || currentItems.length === 0}
        />
      </div>
    </main>
  );
}
