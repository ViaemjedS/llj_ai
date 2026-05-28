import {
    Injectable,
    Inject,
} from '@nestjs/common';
import {
    ConfigService,
} from '@nestjs/config';
import {
    MailerService,
} from '@nestjs-modules/mailer';
import {
    tool,
} from '@langchain/core/tools';
import { z } from 'zod';
