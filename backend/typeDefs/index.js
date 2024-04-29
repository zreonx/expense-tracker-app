import { mergeTypeDefs } from "@graphql-tools/merge";

//typeDefs
import userTypeDefs from "./user.typeDef.js";
import transactionTypeDef from "./transaction.typeDef.js";

const mergedTypeDefs = mergeTypeDefs([userTypeDefs, transactionTypeDef]);

export default mergedTypeDefs;
