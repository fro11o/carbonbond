/*eslint-disable*/
export type Option<T> = T | null;
export type BoxedErr = string
export type ForceValidateError<T> = string
// @ts-ignore
export type HashMap<K extends string | number, T> = { [key: K]: T };
export type Result<T, E> = {
    'Ok': T
} | {
    'Err': E
};
export type User = {     id: number; user_name: string; energy: number; sentence: string;     hated_count: number; followed_count: number; hating_count: number;     following_count: number; introduction: string; gender: string; job:     string; city: string };
export type UserMini = { id: number; user_name: string; energy: number; sentence: string };
export type Party = {     id: number; party_name: string; board_id: number | null; board_name: string | null; energy: number; ruling: boolean; create_time:     string};
export enum BoardType { General = "General", Personal = "Personal" };
export type Board = {     id: number; board_name: string; board_type: string; create_time:     string; title: string; detail: string; force: string;     ruling_party_id: number; popularity: number };
export type BoardName = { id: number; board_name: string };
export type NewBoard = {     board_name: string; board_type: string; title: string; detail:     string; force: string; ruling_party_id: number };
export type ArticlePersonalMeta = { is_favorite: boolean };
export type ArticleDigest = { content: string; truncated: boolean };
export type ArticleMeta = {     id: number; energy: number; board_id: number; board_name: string;     category_id: number; category_name: string; category_source: string;     title: string; author_id: number; author_name: string; digest:     ArticleDigest; category_families: string []; create_time: string; stat: ArticleStatistics; personal_meta: ArticlePersonalMeta };
export type SignupInvitation = {     id: number; description: string; from_user: number; to_user: number     | null; code: string | null; last_activate_time: string|     null };
export type Favorite = { meta: ArticleMeta; create_time: string};
export type ArticleStatistics = { replies: number; satellite_replies: number };
export type Article = { meta: ArticleMeta; content: string };
export type BoardOverview = { id: number; board_name: string; title: string; popularity: number };
export enum UserRelationKind {     Follow = "Follow", Hate = "Hate", OpenlyFollow = "OpenlyFollow",     OpenlyHate = "OpenlyHate", None = "None" };
export type UserRelation = { from_user: number; to_user: number; kind: UserRelationKind };
export enum NotificationKind {     Follow = "Follow", Hate = "Hate", ArticleReplied = "ArticleReplied",     ArticleGoodReplied = "ArticleGoodReplied", ArticleBadReplied =     "ArticleBadReplied" };
export type Notification = {     id: number; kind: NotificationKind; user_id: number; read: boolean; quality: boolean | null; create_time: string; board_name:     string | null; board_id: number | null; user2_name: string | null;     user2_id: number | null; article1_title: string | null; article2_title: string | null; article1_id: number | null; article2_id: number |     null };
export type SearchField = 
 | { String: string } 
 | { Range: [number, number] };
export type Edge = {     id: number; from: number; to: number; energy: number; name:     string };
export type Graph = { nodes: ArticleMeta []; edges: Edge [] };
export type FamilyFilter = 
 | { WhiteList: string [] } 
 | { BlackList: string [] } 
 | "None";
export type Bond = { energy: number; target_article: number; tag: string | null };
export enum DataType {     Category = "Category", IntField = "IntField", StringField = "StringField",     BondField = "BondField", Board = "Board", Article = "Article", Party =     "Party", User = "User", Notification = "Notification", SignupToken =     "SignupToken" };
export type BondError = 
 | { Custom: Error } 
 | "TargetNotFound" 
 | { TargetNotSameBoard: number } 
 | "TargetViolateCategory" 
 | "TargetViolateEnergy";
export type ErrorCode = 
 | "NeedLogin" 
 | "PermissionDenied" 
 | { NotFound: [DataType, string] } 
 | "DuplicateRegister" 
 | "ParsingJson" 
 | { ForceValidate: ForceValidateError<BondError>} 
 | "UnImplemented" 
 | { Other: string };
export type Error = 
 | { OperationError: { msg: string [] } } 
 | { LogicError: { msg: string []; code: ErrorCode } } 
 | { InternalError: { msg: string []; source: BoxedErr } };
export abstract class RootQueryFetcher {
    abstract fetchResult(query: Object): Promise<string>;
    async queryMe(): Promise<Result<Option<User>, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "QueryMe": {  } } }));
    }
    async queryMyPartyList(): Promise<Result<Array<Party>, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "QueryMyPartyList": {  } } }));
    }
    async queryMyFavoriteArticleList(): Promise<Result<Array<Favorite>, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "QueryMyFavoriteArticleList": {  } } }));
    }
    async sendSignupEmail(email: string): Promise<Result<null, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "SendSignupEmail": { email } } }));
    }
    async signup(user_name: string, password: string, token: string): Promise<Result<User, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "Signup": { user_name, password, token } } }));
    }
    async queryEmailByToken(token: string): Promise<Result<string, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "QueryEmailByToken": { token } } }));
    }
    async login(user_name: string, password: string): Promise<Result<Option<User>, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "Login": { user_name, password } } }));
    }
    async logout(): Promise<Result<null, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "Logout": {  } } }));
    }
    async queryUser(name: string): Promise<Result<User, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "QueryUser": { name } } }));
    }
    async querySubcribedBoards(): Promise<Result<Array<BoardOverview>, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "QuerySubcribedBoards": {  } } }));
    }
    async subscribeBoard(board_id: number): Promise<Result<null, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "SubscribeBoard": { board_id } } }));
    }
    async unsubscribeBoard(board_id: number): Promise<Result<null, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "UnsubscribeBoard": { board_id } } }));
    }
    async favoriteArticle(article_id: number): Promise<Result<number, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "FavoriteArticle": { article_id } } }));
    }
    async unfavoriteArticle(article_id: number): Promise<Result<null, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "UnfavoriteArticle": { article_id } } }));
    }
    async createUserRelation(target_user: number, kind: UserRelationKind): Promise<Result<null, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "CreateUserRelation": { target_user, kind } } }));
    }
    async deleteUserRelation(target_user: number): Promise<Result<null, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "DeleteUserRelation": { target_user } } }));
    }
    async queryUserRelation(target_user: number): Promise<Result<UserRelationKind, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "QueryUserRelation": { target_user } } }));
    }
    async queryFollowerList(user: number): Promise<Result<Array<UserMini>, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "QueryFollowerList": { user } } }));
    }
    async queryHaterList(user: number): Promise<Result<Array<UserMini>, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "QueryHaterList": { user } } }));
    }
    async querySignupInvitationList(user: number): Promise<Result<Array<SignupInvitation>, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "QuerySignupInvitationList": { user } } }));
    }
    async addSignupInvitation(user: number, description: string): Promise<Result<number, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "AddSignupInvitation": { user, description } } }));
    }
    async activateSignupInvitation(signup_invitation_id: number): Promise<Result<string, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "ActivateSignupInvitation": { signup_invitation_id } } }));
    }
    async deactivateSignupInvitation(signup_invitation_id: number): Promise<Result<null, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "DeactivateSignupInvitation": { signup_invitation_id } } }));
    }
    async updateAvatar(image: string): Promise<Result<null, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "UpdateAvatar": { image } } }));
    }
    async updateSentence(sentence: string): Promise<Result<null, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "UpdateSentence": { sentence } } }));
    }
    async updateInformation(introduction: string, gender: string, job: string, city: string): Promise<Result<null, Error>> {
        return JSON.parse(await this.fetchResult({ "User": { "UpdateInformation": { introduction, gender, job, city } } }));
    }
    async queryParty(party_name: string): Promise<Result<Party, Error>> {
        return JSON.parse(await this.fetchResult({ "Party": { "QueryParty": { party_name } } }));
    }
    async createParty(party_name: string, board_name: Option<string>): Promise<Result<number, Error>> {
        return JSON.parse(await this.fetchResult({ "Party": { "CreateParty": { party_name, board_name } } }));
    }
    async queryBoardPartyList(board_id: number): Promise<Result<Array<Party>, Error>> {
        return JSON.parse(await this.fetchResult({ "Party": { "QueryBoardPartyList": { board_id } } }));
    }
    async queryArticleList(count: number, max_id: Option<number>, author_name: Option<string>, board_name: Option<string>, family_filter: FamilyFilter): Promise<Result<Array<ArticleMeta>, Error>> {
        return JSON.parse(await this.fetchResult({ "Article": { "QueryArticleList": { count, max_id, author_name, board_name, family_filter } } }));
    }
    async queryArticle(id: number): Promise<Result<Article, Error>> {
        return JSON.parse(await this.fetchResult({ "Article": { "QueryArticle": { id } } }));
    }
    async queryArticleMeta(id: number): Promise<Result<ArticleMeta, Error>> {
        return JSON.parse(await this.fetchResult({ "Article": { "QueryArticleMeta": { id } } }));
    }
    async queryBonder(id: number, category_set: Option<Array<string>>, family_filter: FamilyFilter): Promise<Result<Array<[Edge, Article]>, Error>> {
        return JSON.parse(await this.fetchResult({ "Article": { "QueryBonder": { id, category_set, family_filter } } }));
    }
    async queryBonderMeta(id: number, category_set: Option<Array<string>>, family_filter: FamilyFilter): Promise<Result<Array<[Edge, ArticleMeta]>, Error>> {
        return JSON.parse(await this.fetchResult({ "Article": { "QueryBonderMeta": { id, category_set, family_filter } } }));
    }
    async createArticle(board_id: number, category_name: string, title: string, content: string): Promise<Result<number, Error>> {
        return JSON.parse(await this.fetchResult({ "Article": { "CreateArticle": { board_id, category_name, title, content } } }));
    }
    async searchArticle(author_name: Option<string>, board_name: Option<string>, start_time: Option<string>, end_time: Option<string>, category: Option<number>, title: Option<string>, content: HashMap<string,SearchField>): Promise<Result<Array<ArticleMeta>, Error>> {
        return JSON.parse(await this.fetchResult({ "Article": { "SearchArticle": { author_name, board_name, start_time, end_time, category, title, content } } }));
    }
    async queryGraph(article_id: number, category_set: Option<Array<string>>, family_filter: FamilyFilter): Promise<Result<Graph, Error>> {
        return JSON.parse(await this.fetchResult({ "Article": { "QueryGraph": { article_id, category_set, family_filter } } }));
    }
    async queryBoardList(count: number): Promise<Result<Array<Board>, Error>> {
        return JSON.parse(await this.fetchResult({ "Board": { "QueryBoardList": { count } } }));
    }
    async queryBoardNameList(): Promise<Result<Array<BoardName>, Error>> {
        return JSON.parse(await this.fetchResult({ "Board": { "QueryBoardNameList": {  } } }));
    }
    async queryBoard(name: string, style: string): Promise<Result<Board, Error>> {
        return JSON.parse(await this.fetchResult({ "Board": { "QueryBoard": { name, style } } }));
    }
    async queryBoardById(id: number): Promise<Result<Board, Error>> {
        return JSON.parse(await this.fetchResult({ "Board": { "QueryBoardById": { id } } }));
    }
    async querySubscribedUserCount(id: number): Promise<Result<number, Error>> {
        return JSON.parse(await this.fetchResult({ "Board": { "QuerySubscribedUserCount": { id } } }));
    }
    async createBoard(new_board: NewBoard): Promise<Result<number, Error>> {
        return JSON.parse(await this.fetchResult({ "Board": { "CreateBoard": { new_board } } }));
    }
    async queryHotBoards(): Promise<Result<Array<BoardOverview>, Error>> {
        return JSON.parse(await this.fetchResult({ "Board": { "QueryHotBoards": {  } } }));
    }
    async queryCategoryById(id: number): Promise<Result<string, Error>> {
        return JSON.parse(await this.fetchResult({ "Board": { "QueryCategoryById": { id } } }));
    }
    async queryNotificationByUser(all: boolean): Promise<Result<Array<Notification>, Error>> {
        return JSON.parse(await this.fetchResult({ "Notification": { "QueryNotificationByUser": { all } } }));
    }
    async readNotifications(ids: Array<number>): Promise<Result<null, Error>> {
        return JSON.parse(await this.fetchResult({ "Notification": { "ReadNotifications": { ids } } }));
    }
}
