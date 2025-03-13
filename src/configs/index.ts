import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
//   adminSecretKey: process.env.ADMIN_SECRET_KEY!,
//   aws: {
//     accessKey: process.env.AWS_ACCESS_KEY!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
//   },
//   s3: {
//     region: process.env.S3_REGION!,
//     bucketName: process.env.S3_BUCKET_NAME!
//   },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN!
  },
  mongodb: {
    uri: process.env.MONGODB_URI!
  }
};
