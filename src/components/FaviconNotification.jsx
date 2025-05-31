import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Box, keyframes } from '@chakra-ui/react';
import { productsState, newProductsViewedState } from '../recoil/state';

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const FaviconNotification = () => {
  const products = useRecoilValue(productsState);
  const [newProductsViewed, setNewProductsViewed] = useRecoilState(newProductsViewedState);
  const [originalTitle, setOriginalTitle] = useState('');
  const [titleBlinking, setTitleBlinking] = useState(false);

  // Detectar productos nuevos (últimos 30 días o marcados como nuevos)
  const getNewProducts = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    return products.filter(product => {
      if (product.isNew) return true;
      if (product.dateAdded) {
        const productDate = new Date(product.dateAdded);
        return productDate > thirtyDaysAgo;
      }
      return false;
    });
  };

  const newProducts = getNewProducts();
  const hasNewProducts = newProducts.length > 0 && !newProductsViewed;

  // Función para cambiar el favicon
  const changeFavicon = (iconPath) => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = iconPath;
    document.getElementsByTagName('head')[0].appendChild(link);
  };

  // Función para crear favicon con notificación
  const createNotificationFavicon = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    // Fondo del favicon (puedes cambiar el color)
    ctx.fillStyle = '#4A90E2';
    ctx.fillRect(0, 0, 32, 32);

    // Texto "N" para "Nuevo"
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('N', 16, 22);

    // Badge rojo
    ctx.fillStyle = '#FF4444';
    ctx.beginPath();
    ctx.arc(24, 8, 6, 0, 2 * Math.PI);
    ctx.fill();

    return canvas.toDataURL();
  };

  // Función para hacer parpadear el título
  const blinkTitle = () => {
    if (!originalTitle) {
      setOriginalTitle(document.title);
    }
    
    let isOriginal = true;
    const interval = setInterval(() => {
      if (hasNewProducts) {
        document.title = isOriginal 
          ? `(${newProducts.length}) ¡NUEVOS PRODUCTOS!` 
          : originalTitle;
        isOriginal = !isOriginal;
      } else {
        document.title = originalTitle;
        clearInterval(interval);
        setTitleBlinking(false);
      }
    }, 1500);

    return interval;
  };

  useEffect(() => {
    if (hasNewProducts) {
      // Cambiar favicon a versión con notificación
      changeFavicon(createNotificationFavicon());
      
      // Iniciar parpadeo del título
      if (!titleBlinking) {
        setTitleBlinking(true);
        const interval = blinkTitle();
        
        return () => {
          clearInterval(interval);
          document.title = originalTitle;
        };
      }
    } else {
      // Restaurar favicon original
      changeFavicon('/favicon.ico');
      document.title = originalTitle || document.title;
      setTitleBlinking(false);
    }
  }, [hasNewProducts, newProducts.length, titleBlinking, originalTitle]);

  // Verificar productos nuevos cada 5 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      // Forzar re-evaluación de productos nuevos
      const currentNewProducts = getNewProducts();
      if (currentNewProducts.length > 0 && newProductsViewed) {
        // Si hay productos nuevos y ya se habían visto, resetear el estado
        const hasReallyNewProducts = currentNewProducts.some(product => {
          const viewedTime = localStorage.getItem('newProductsViewedTime');
          if (!viewedTime) return true;
          
          const productTime = product.dateAdded ? new Date(product.dateAdded) : new Date();
          return productTime > new Date(viewedTime);
        });
        
        if (hasReallyNewProducts) {
          setNewProductsViewed(false);
        }
      }
    }, 5 * 60 * 1000); // 5 minutos

    return () => clearInterval(interval);
  }, [newProductsViewed, setNewProductsViewed]);

  // Badge component para el logo
  const NotificationBadge = ({ children, show }) => {
    if (!show) return children;

    return (
      <Box position="relative" display="inline-block">
        {children}
        <Box
          position="absolute"
          top="-8px"
          right="-8px"
          bg="red.500"
          color="white"
          borderRadius="full"
          width="20px"
          height="20px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="xs"
          fontWeight="bold"
          animation={`${pulse} 2s infinite`}
          zIndex={10}
        >
          {newProducts.length > 9 ? '9+' : newProducts.length}
        </Box>
      </Box>
    );
  };

  // Exponer el componente Badge para uso en Header
  FaviconNotification.Badge = NotificationBadge;

  return null; // Este componente no renderiza nada visible
};

export default FaviconNotification;