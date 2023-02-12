import { DocumentBuilder } from '@nestjs/swagger';

export default function swagger() {
  const config = new DocumentBuilder()
    .setTitle('Blog task')
    .setDescription('Blog task implementation example')
    .setVersion('1.0')
    .addTag('blog')
    .build();

  return { config, path: '/api' };
}
