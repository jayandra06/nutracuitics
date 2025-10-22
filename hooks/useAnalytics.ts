'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';

export const useAnalytics = () => {
  const trackEvent = (eventName: string, parameters?: any) => {
    if (analytics) {
      logEvent(analytics, eventName, parameters);
    }
  };

  const trackPageView = (pageName: string) => {
    trackEvent('page_view', {
      page_title: pageName,
      page_location: window.location.href,
    });
  };

  const trackPurchase = (transactionId: string, value: number, currency: string = 'INR', items: any[] = []) => {
    trackEvent('purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items,
    });
  };

  const trackAddToCart = (itemId: string, itemName: string, category: string, price: number) => {
    trackEvent('add_to_cart', {
      currency: 'INR',
      value: price,
      items: [{
        item_id: itemId,
        item_name: itemName,
        item_category: category,
        price: price,
        quantity: 1,
      }],
    });
  };

  const trackRemoveFromCart = (itemId: string, itemName: string, category: string, price: number) => {
    trackEvent('remove_from_cart', {
      currency: 'INR',
      value: price,
      items: [{
        item_id: itemId,
        item_name: itemName,
        item_category: category,
        price: price,
        quantity: 1,
      }],
    });
  };

  const trackBeginCheckout = (value: number, currency: string = 'INR', items: any[] = []) => {
    trackEvent('begin_checkout', {
      currency: currency,
      value: value,
      items: items,
    });
  };

  const trackLogin = (method: string = 'phone') => {
    trackEvent('login', {
      method: method,
    });
  };

  const trackSignUp = (method: string = 'phone') => {
    trackEvent('sign_up', {
      method: method,
    });
  };

  const trackSearch = (searchTerm: string) => {
    trackEvent('search', {
      search_term: searchTerm,
    });
  };

  const trackViewItem = (itemId: string, itemName: string, category: string, price: number) => {
    trackEvent('view_item', {
      currency: 'INR',
      value: price,
      items: [{
        item_id: itemId,
        item_name: itemName,
        item_category: category,
        price: price,
      }],
    });
  };

  const trackViewItemList = (itemListId: string, itemListName: string, items: any[]) => {
    trackEvent('view_item_list', {
      item_list_id: itemListId,
      item_list_name: itemListName,
      items: items,
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackPurchase,
    trackAddToCart,
    trackRemoveFromCart,
    trackBeginCheckout,
    trackLogin,
    trackSignUp,
    trackSearch,
    trackViewItem,
    trackViewItemList,
  };
};
