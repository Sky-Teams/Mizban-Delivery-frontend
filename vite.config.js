import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // usePolling allows vite to scan any changes in the files itself and do not wait to the OS like Windows to sends signal to it when a file changes. This is because the underlaying technology of Docker is based on Linux and sometimes cannot notice if a file on Windows is changed. This property helps to see changes on the browser right away.
      usePolling: true, 
      // check every milisecond if a file changes.
      interval: 100,  
    },
    // This property allow vite to accept other connections rather than the default 127.0.0.1(localhost). We use this to allow our running container on Dokcer to send connections and access our web app on browser.
    host: true,
    // This is the port we used for our docker container.
    port: 5173,
    strictPort:true
  },
});
