import Promise from 'bluebird';
import { request } from '~/utils/request';
import { normalizeError } from  '~/utils/normalizer/error';


export function getUserList(params) {
    return new Promise((resolve, reject) => {

        request('GET', '')
            .query(params)
            .end((err, res) => {
                const error = normalizeError(err, res);
                if (error) {
                    reject(error);
                }
                else {
                    resolve( res.body.results );
                }
            });
    });
}
