
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Menu from '../menu/menu';
import styles from './app.module.scss';

const queryClient = new QueryClient();

function App() {
  return (
    <main className={styles.app}>
      <QueryClientProvider client={queryClient}>
        <Menu />
      </QueryClientProvider>
    </main>
  )
}

export default App;
