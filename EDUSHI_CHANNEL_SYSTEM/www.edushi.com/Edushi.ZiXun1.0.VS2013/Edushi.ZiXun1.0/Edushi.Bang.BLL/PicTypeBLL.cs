�}�� r �	  �q�3��a	��3��px�P �V�u'��V���������k?_��%xzf�Q{��H����� 3����cJ����l���ޘ�Y$ޜ�Z�}�N����q)�m���7uڃ�&ިqdj���%J�[�@+��z)��y�<3���1��+�d������Apr�W*՗/l��\�����(C{S�0���{}�Vӷ>�va��vx��t�aٞp�3rw��Î��B�m:���iu��8h{�Ru���g��/)��NYr�����l�(�i
��qI_.(ҟe�瓄�[m@���bG�A��̼�3�K7�p�t����ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD�$���NQ�|h�����x6$���z��ǰuD����(gw��>�m`�u9��H�u��%4�u�"�,��{_Q��<r�^
N�`�X~L��#E�8�(A�¹u����m�+�F��~��s��1�s��/����aM��oȓ�c\D".�Y*�Nr���pŰEs���0�h�[i�(/��O��cvp���N�v����/�fW�:[Ť�c�Xo�p@�sJ�`�O��j��]�R.��-D�l\T���D\��~ �L���G�pb:ʓ���^�?/�kYrH���/H���U+�(�sˣЪ}K��我��~�h{L�M�|�{�2�X~lG�/z�no^ZI��1�P����1����n��ź�8`$���R�Ͽ�Sv|l$��f��L]�~[���O+��8-4l��׷�/�y� �!��=���0;��z�e�����U�ݡN
dZ�	�A�Ѯ0��TcsV�S�+��ń)�	���͙�l ����� r�����EJyP����16O����" D{�Y#@Di�|W�[?tD��ص���_4&d71���^���SC	G ��}���ԼӐ�8�&5y�k��)'�[�o w,w߽� � e�E��qr��|�덻k�5��y5Eq���(mBVp�����tx9`�}�[�zE�4��8S�-�.����т>��to�a���[�����W8B�'�c�O���s�9�d,݂��jy�Dmg"g��B�Y�}�'D�t�6���r`�E���bA˞�g�pKL�xB�W���5��Y�m��2���3�o���g
�R}�`o�O8�z$;��"�ek���D����Ͼù����y���� ��|��2`���?�����m�͏�ZJgc����/�Oc�Uÿ��m�4��I9��y4�a)��~R:J�6�X���ck����A� y����Y�������

_=��oߙ���� ���+ccess().CreateObject("PicTypeDAL");//创建InfoTypeDAL的实例
                lst = objType == null ? new List<PicTypeModel>() : ((IPicTypeDAL)objType).getAllPicType();
                cache.Add(key, lst, DateTimeOffset.Now.AddHours(24));
            }
            else
            {
                lst = cache.Get(key) as List<PicTypeModel>;
            }
            return lst;
        }
        #endregion
    }
}
