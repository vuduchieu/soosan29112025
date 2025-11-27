import React, { useState } from 'react';
import QuickContact from './QuickContact';
import OrderNotification from './OrderNotification';

const FloatingWidgets: React.FC = () => {
  const [isQuickContactOpen, setIsQuickContactOpen] = useState(false);

  return (
    <>
      <QuickContact isOpen={isQuickContactOpen} setIsOpen={setIsQuickContactOpen} />
      <OrderNotification />
    </>
  );
};

export default FloatingWidgets;
