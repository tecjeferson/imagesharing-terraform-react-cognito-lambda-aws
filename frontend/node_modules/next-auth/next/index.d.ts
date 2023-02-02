import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import type { AuthOptions, Session } from "..";
import type { CallbacksOptions } from "../core/types";
declare function NextAuth(options: AuthOptions): any;
declare function NextAuth(req: NextApiRequest, res: NextApiResponse, options: AuthOptions): any;
export default NextAuth;
declare type GetServerSessionOptions = Partial<Omit<AuthOptions, "callbacks">> & {
    callbacks?: Omit<AuthOptions["callbacks"], "session"> & {
        session?: (...args: Parameters<CallbacksOptions["session"]>) => any;
    };
};
export declare function unstable_getServerSession<O extends GetServerSessionOptions, R = O["callbacks"] extends {
    session: (...args: any[]) => infer U;
} ? U : Session>(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"], O] | [NextApiRequest, NextApiResponse, O] | [O] | []): Promise<R | null>;
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXTAUTH_URL?: string;
            VERCEL?: "1";
        }
    }
}
