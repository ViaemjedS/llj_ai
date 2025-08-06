import  useTitle  from '@/hooks/useTitle';
import SearchBox from '@/components/SearchBox';
import useSearchStore from "@/store/useSearchStore";
import styles from './search.module.css';
import {
  useState,
  useEffect,
  memo
} from 'react';

const HotListItems = memo((props) => {
  console.log('-------------', props);
  const {hotList}=props;
  return (
    <div className={styles.hot}>
      <h1>热门推荐</h1>
      {
        hotList.map((item) => (
          <div key={item.id} className={styles.item}>
            {item.city}
          </div>
        ))
      }
    </div>
  )
})

const Search = () => {
  useTitle('搜索');
  const [query, setQuery] = useState('');
  const {
    hotList,
    setHotList,
    suggestList,
    setSuggestList 
  } = useSearchStore();

  useEffect(() => {
    setHotList();
  }, [])
  // 单向数据流 
  // 反复生成 useCallback
  const handleQuery = (query) => {
    // api 请求
    console.log('debounce后', query);
    if (!query) {
      return;
    }
    setQuery(query)
    setSuggestList(query);
  }

  const suggestListStyle = {
    display: query == "" ? 'none' : 'block'
  }


  return (
    <div>
      <h1>Search</h1>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          < SearchBox handleQuery={handleQuery} />
          <HotListItems hotList={hotList} />
          <div className={styles.list} style={suggestListStyle}>
            {
              suggestList.map(item => (
                <div key={item} className={styles.item}>
                  {item}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search