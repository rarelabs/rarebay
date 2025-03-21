import React, { ReactNode } from "react";
import { PreparedTransaction } from "thirdweb";
import { TransactionButton as ThirdwebTransactionButton } from "thirdweb/react";
import { useToast } from "../utils/toast";

type TransactionButtonProps = {
    id?: string;
    disabled?: boolean,
    transaction: () => PreparedTransaction<any> | Promise<PreparedTransaction<any>>,
    onSent: string,
    onConfirmed: string,
    onError: string,
    successCallback?: () => void,
    children: ReactNode
}

export default function TransactionButton(props: TransactionButtonProps) {
  const {addToast} = useToast();
    return (
        <ThirdwebTransactionButton
        theme={"light"}
        style={{width: '100%', background: 'transparent', border:  'none', height: '100%', color: "white", padding: '0px', fontSize: '20px', fill: 'white', zIndex: '5'}}
            transaction={props.transaction}
            onTransactionSent={(result) =>
               (props.onSent, addToast('info', `Transaction sent`))
            }
            onTransactionConfirmed={(receipt) => {
                (props.onConfirmed,addToast('success', `Transaction Confirmed`))
                props.successCallback && props.successCallback();
            }}
            onError={(error) =>
             {   (props.onError,  addToast('error', `Transaction Error ${error}`))
                console.log(error)
             }
                
            }
        >
            {props.children}
        </ThirdwebTransactionButton>
    )
}