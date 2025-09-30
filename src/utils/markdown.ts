const getLinkAction = (href: string) => {
  if (href === "#button-cookie-edit-preferences") {
    return () => {
      document.getElementById("ot-sdk-btn-floating")?.click();
    };
  }

  return undefined;
};

export { getLinkAction };
