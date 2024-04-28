import React from 'react'
import { ConfigProvider, Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import styles from './style.module.css';

type PaginationType = {
    current: number,
    totalPage: number,
    setCurrent: React.Dispatch<React.SetStateAction<number>>
}

const PaginationCustom = ({ current, setCurrent, totalPage }: PaginationType) => {

    const onChange: PaginationProps['onChange'] = (page: number) => {
        setCurrent(page);
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Pagination: {
                        colorText: '#fff',
                        colorPrimary: '#000',
                        colorPrimaryHover: '#000011'
                    }
                }
            }}
        >
            <div className={styles.pagination}>
                <Pagination
                    defaultCurrent={1}
                    current={current}
                    total={totalPage}
                    onChange={onChange}
                />
            </div>
        </ConfigProvider>
    )
}

export default PaginationCustom