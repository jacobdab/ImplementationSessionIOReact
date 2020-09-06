import React, {useRef} from 'react';
import './Modal.scss';


interface Props {
    show: boolean,
    children: any,
    modalShow: any
}

const Modal = (props: Props) => {
    const {show, modalShow, children} = props;
    const ref = useRef<HTMLDivElement>(null);

    const handleOutside = (e: React.MouseEvent<HTMLLIElement | HTMLDivElement, MouseEvent>) => {
        if (ref && ref.current && !ref.current.contains((e.target) as Node)) {
            modalShow(e)
        }
    }

    return show ? <div className={'fade'}
                       onClick={(e) => {
                           handleOutside(e)
                       }}>
        <div className={'Modal'} ref={ref}>
            {React.cloneElement(children, {modalShow: modalShow})}
        </div>
    </div> : <></>
}

export default Modal;
