import { ReactNode } from 'react';

/**
 * @name AppLayoutProps
 *
 * @description This interface contains the props for the AppLayout component.
 */

export interface AppLayoutProps {
	component: ReactNode | undefined;
	headerTitle?: string;
}
