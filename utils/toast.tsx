import React, { createContext, useContext, useState, ReactNode } from "react";

interface Toast {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
}

interface ToastContextProps {
  addToast: (type: Toast["type"], message: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const id = Math.random().toString(36).substr(2, 9);
  const addToast = (type: Toast["type"], message: string) => {
    const toast: Toast = { id, type, message };
    setToasts((prev) => [...prev, toast]);

    // Remove toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2000);
  };

  // Helper function to get the appropriate icon based on toast type
  const getIconForToastType = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.29417 12.9577L10.5048 16.1681L17.6729 9" stroke="rgba(0, 250, 0, 1)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> <circle cx="12" cy="12" r="10" stroke="rgba(0, 250, 0, 1)" stroke-width="2"></circle> </g></svg>
        );
      case "error":
        return (
          <svg width="20" height="20"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.0303 8.96965C9.73741 8.67676 9.26253 8.67676 8.96964 8.96965C8.67675 9.26255 8.67675 9.73742 8.96964 10.0303L10.9393 12L8.96966 13.9697C8.67677 14.2625 8.67677 14.7374 8.96966 15.0303C9.26255 15.3232 9.73743 15.3232 10.0303 15.0303L12 13.0607L13.9696 15.0303C14.2625 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2625 15.0303 13.9696L13.0606 12L15.0303 10.0303C15.3232 9.73744 15.3232 9.26257 15.0303 8.96968C14.7374 8.67678 14.2625 8.67678 13.9696 8.96968L12 10.9393L10.0303 8.96965Z" fill="rgba(250, 0, 0, 1)"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z" fill="rgba(250, 0, 0, 1)"></path> </g></svg>
        );
      case "info":
        return (
          <svg  width="20" height="20" fill="white" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" d="M253.617407,12.4967773 L434.398258,193.277628 C451.060628,209.939998 451.060628,236.955037 434.398258,253.617407 L253.617407,434.398258 C236.955037,451.060628 209.939998,451.060628 193.277628,434.398258 L12.4967773,253.617407 C-4.16559245,236.955037 -4.16559245,209.939998 12.4967773,193.277628 L193.277628,12.4967773 C209.939998,-4.16559245 236.955037,-4.16559245 253.617407,12.4967773 Z M223.447518,42.6666667 L42.6666667,223.447518 L223.447518,404.228369 L404.228369,223.447518 L223.447518,42.6666667 Z M223.447518,282.114184 C238.685613,282.114184 250.114184,293.378184 250.114184,308.738184 C250.114184,324.098184 238.685613,335.362184 223.447518,335.362184 C207.863102,335.362184 196.780851,324.098184 196.780851,308.396851 C196.780851,293.378184 208.209422,282.114184 223.447518,282.114184 Z M244.780851,116.780851 L244.780851,244.780851 L202.114184,244.780851 L202.114184,116.780851 L244.780851,116.780851 Z" transform="translate(32.552 32.552)"></path></g></svg>
        );
      case "warning":
        return (
          <svg  width="20" height="20" fill="rgba(250, 250, 0, 1)" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" d="M253.617407,12.4967773 L434.398258,193.277628 C451.060628,209.939998 451.060628,236.955037 434.398258,253.617407 L253.617407,434.398258 C236.955037,451.060628 209.939998,451.060628 193.277628,434.398258 L12.4967773,253.617407 C-4.16559245,236.955037 -4.16559245,209.939998 12.4967773,193.277628 L193.277628,12.4967773 C209.939998,-4.16559245 236.955037,-4.16559245 253.617407,12.4967773 Z M223.447518,42.6666667 L42.6666667,223.447518 L223.447518,404.228369 L404.228369,223.447518 L223.447518,42.6666667 Z M223.447518,282.114184 C238.685613,282.114184 250.114184,293.378184 250.114184,308.738184 C250.114184,324.098184 238.685613,335.362184 223.447518,335.362184 C207.863102,335.362184 196.780851,324.098184 196.780851,308.396851 C196.780851,293.378184 208.209422,282.114184 223.447518,282.114184 Z M244.780851,116.780851 L244.780851,244.780851 L202.114184,244.780851 L202.114184,116.780851 L244.780851,116.780851 Z" transform="translate(32.552 32.552)"></path></g></svg>
        );
      default:
        return null;
    }
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
         <>
         <div
            key={toast.id}
            className={`toast ${toast.type}`}
          >
            
            {getIconForToastType(toast.type)}
            <span className="toast-message">{toast.message}</span>
          </div>
          </>
        ))}
      </div>
      <style jsx>{`
        .toast-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
          max-width: 300px;
        }
        .toast {
          margin-bottom: 10px;
          padding: 15px;
          min-width: 300px;
          border-radius: 5px;
          color: white;
          font-size: 14px;
          font-weight: bold;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          opacity: 0.9;
          display: flex;
          align-items: center;
          overflow: scroll;
        }
        .toast-message {
          margin-left: 10px;  // Adds some space between icon and text
        }
        .toast.success {
          background-color: rgba(0, 50, 0, 0.7);
          backdrop-filter: blur(10px);
          border: rgba(0, 250, 0, 1) solid 1px;
          color: rgba(0, 250, 0, 1);
          box-shadow: 0px 0px 20px rgba(20, 200, 20, 0.3);
        }
        .toast.error {
          background-color: rgba(50, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          border: rgba(250, 0, 0, 1) solid 1px;
          color: rgba(250, 0, 0, 1);
          box-shadow: 0px 0px 20px rgba(200, 20, 20, 0.3);
        }
        .toast.warning {
          background-color: rgba(50, 50, 0, 0.7);
          backdrop-filter: blur(10px);
          border: rgba(250, 250, 0, 1) solid 1px;
          color: rgba(250, 250, 0, 1);
          box-shadow: 0px 0px 20px orange;
        }
        .toast.info {
          background-color: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(20px);
          border: white solid 1px;
          color: white;
          box-shadow: 0px 0px 20px rgba(200, 200, 200, 0.3);
        }
      `}</style>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};