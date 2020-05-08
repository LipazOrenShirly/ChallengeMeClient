
import React from 'react';


const EmptyImgStudentBase64 = "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"

export default EmptyImgStudentBase64;