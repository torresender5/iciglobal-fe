import { useNavigate } from 'react-router-dom';
// import { useSelector } from "react-redux";
import {useAppSelector} from '../hooks/dispatch'

// project imports
// import config from 'config';
// import { DefaultRootStateProps, GuardProps } from 'types';
import { ReactElement, useEffect } from 'react';

// ==============================|| GUEST GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */
export type GuardProps = {
    children: ReactElement | null
}
const GuestGuard = ({ children }: GuardProps) => {
    const {isLogin} = useAppSelector((state) => state.login);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) {
            navigate('/', { replace: true });
        }
    }, [isLogin, navigate]);

    return children;
};

export default GuestGuard;