�}� r Z!  ���[z���a	���۟N���AM�}�TM���씜T8��BݦH,#��qGH�q�~�g���~���{�֐���`k�H��OxD&������b-�ϻ�������Ś�����=��,�PND�ՌS�J|��+z6g�k���Ԁsu�v��hO1��v"�߈{�.-x��Q_x;������ "�Tf�[2��P;�*�!3|Y��S������S�G�١8�-�����rQ��T��堢#�\��^�s�hs\�6/��<m#���o���9��*Ƭi[^��DC���'&�<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�(p>X�i~��bT��]�C��ː�e�١�_r䊚�Qwp �b(OX��M	�x�O+�~�#5� ����:�Hy��X0әHHtl\�'>'��C�s9�R����QMY�3���^#�p��o%���M�&�O������3>�tD�*��ȹvh5����/k��
��d��[-��5�@ҍ�ۤ��m�_�aX��j���>��_I��U��0Zuq���y�C�
E��`[������U��k�����]Ч�5��f��	��"@��'>?[�F�v�:#�-��o:O�&O�h"51�!d?�`8 ����y��#����S�RW�J!��=Q��2�\� Z4Y���-�d�o��j�]��ԟ*OaV������!�Q�iN�-Ч�<�@��\s�U]G��f�iid��D5����]K��Q��7ٌs��┨puD�<�>w� &�4��.�>�Bs�����KYW� ��ǖ,�µ���1W����­�.�Ǖ�            model.currentPage = pageno;
            model.PageRouteName = "Channel1Page";
            var totalCount=0;
            model.PageSize=int.Parse(ConfigurationManager.AppSettings["channelPageSize"]);
            model.RenWuList = DataHelper.GetRwListByPage(currentID, true, pageno, model.PageSize, Url.Content("~/"), ref totalCount, reflectionCache);
            model.TotalCount = totalCount;
            
            return View(model);
        }

    }
}
