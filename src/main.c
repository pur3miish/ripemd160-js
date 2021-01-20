#include "ripemd160.c"

uint8_t hash[RIPEMD160_DIGEST_LENGTH];
uint8_t msg[59];

unsigned char *get_ptr(int x)
{
    unsigned char *ptr;
    switch (x) {
        case 0:
            ptr = (unsigned char*)hash;
        break;
        case 1:
            ptr = (unsigned char*)msg;
        break;
        default:
          return 0;
        break;
    }
    return ptr;
}

void digest(uint32_t length) {
    uint32_t msg_len = strlen(msg);
    ripemd160(msg, msg_len, hash);
}
