�}Z� r   7UL&�Q��a	���#_���}�����&[�;�C��?MX]���T�,-g��F&Lk�u0��A̤t兀y���o@o h!,N�r��i%�K?Jxc���*�A{�*��ə/�u��rn7����ҽ4j��K���.3���l���f�e2���׬�F�S��,mA���TM�ɩ����bX��=T�Z�3|���/1h������&�U�m��:>x��p�sK�T���,1�Q-0� -�Hn�F��Z��I_.l�^��zJu���@��u�)�ux]϶�(ӊ����mͲ�|<��9����2�/�d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD#�X��v�ެ��^򫛋��w3}	כa}(�B��MWϕ�g�d#KP��O`Ȕ��O	�8tf��V��y�Ȗ�"K;��`{�(�"O��f"��&ڭDQhF5�*rjwxW1"��R�N�K�ܕ-,e
��\���=Ӳ��1Չ��f`�r#���ݺ`��(ߝ���P���b�_�<1_
Y"W��7G���s��%�$K:�}. 7W�Fq�]�b�7���+�)@�^�̥H��b4�d�2Ѫ]�ke/ꐤ�.N=k1O��\UA��H���tT�s�^�0���{D��O���ᔅO6t����\��(kqk��b@v�a��B&���[ν���W����Iq�i�!��|�֭>���&?-0^��
�hT2\d`��q���D�߀P�@��3ӄ��t'?����9��&y/ڶP�y�_T��@���N�[�q2���"�C�����עN*Z�]��ef��$D�
��	�,�w���X�lszJregion 老的查询条件模式
            //IMongoQuery query = null;
            //query = Query.And(
            //         Query.EQ("IT_State", 1)
            //     );
            #endregion

            return mongoCollection.FindAs<InfoTypeModel>(query).SetSortOrder(sort).ToList();
        }
        #endregion
    }
}
