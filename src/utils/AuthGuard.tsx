import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import {useAppSelector} from '../hooks/dispatch'

// project imports
// import { DefaultRootStateProps, GuardProps } from 'types';
import { ReactElement, useEffect } from 'react';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
export type GuardProps = {
    children: ReactElement | null
}
const AuthGuard = ({ children }: GuardProps) => {
    const {isLogin} = useAppSelector((state) => state.login);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) {
            navigate('login', { replace: true });
        }
    }, [isLogin, navigate]);

    return children;
};

export default AuthGuard;