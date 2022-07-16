declare namespace Express {
  // faz com que Request entenda que existe um user_id
  //   que vai ser passado pelo ensureAuthenticated para o ensureAdmin
  export interface Request {
    user_id: string;
    file: any;
  }
}
