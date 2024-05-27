type Props = {};
import { useState } from 'react';
import ProductCard from '../ProductCard';
import styles from './PhonesPage.module.scss';
import Icon from '../Icon';
import { Icons } from '../../types';
import { useProductsSelector } from '../../hooks/reduxHooks';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';

export default function PhonesPage({}: Props) {
  const { phones } = useProductsSelector(state => state);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = phones.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(phones.length / itemsPerPage);

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

  return (
    <main className={styles.phonesPage}>
      <Breadcrumbs />
      <h1 className={styles.title}>Mobile Phones</h1>
      <span className={styles.subText}>95 models</span>
      <div className={styles.filter}>Sort placeholder</div>
      <div className={styles.filter}>Items placeholder</div>
      <div className={styles.cardsContainer}>
        {currentItems.map(phone => (
          <ProductCard key={phone.id} product={phone} />
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
          className={`${styles.arrowRight} ${currentPage === totalPages || currentItems.length === 0 ? styles.disabled : ''}`}
          onClick={() => pagination(currentPage + 1)}
          disabled={currentPage === totalPages || currentItems.length === 0}
        />
      </div>
    </main>
  );
}
