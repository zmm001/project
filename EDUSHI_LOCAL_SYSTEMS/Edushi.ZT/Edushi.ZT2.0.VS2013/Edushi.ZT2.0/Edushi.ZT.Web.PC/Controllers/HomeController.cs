�}m� r K"  ��jl�x,��a	��
��_N��}꯱.�||)�tj-f�-FB��K+�������r�*!K�)xE��˽͵��xk��w�?�ͪ�<8;�K����\6p�#���}����<tu�ܘ��F�.8� |�M(��L �p��KO���K����C�㭼6m������zܤ���m�D� 6'*�u�����T�e5�~�a��iU��<�D�8��%��W[��a�s�F��8{�@�K�'��<v����������_���j@�s�I�T��H+�)}�� ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�'3T̞�Eg@lÞ�a�v݇oΝ�m����&��^P��<�al���9r��[*�5ϫ��6����·����,��������D��v��_j��[�!������ȭb<����?Ę�LT����U���<а�x�~�U��!��D����	��D�t�86�{���v�d2�u�)�M�z֢|�9� F_y�=���=��?#!RC[��1�M�R�� �O�!PZ���ٴ�tʊ���-����i���º�޷4�ϥ�l��$ ��\3��YG��?��1�%D�jcyT�h���HE��!I�R=}ؓ�z���)e��Tz������4�à%�����ţ�����#f[b7gR��4�7ģ](�|���+��{�\U�fIĖ+��x~�'�!GnsG����FL�k�������ʫuy�˿�Gt���2S��hC�k��`��(	�_�(���>�W��)%k���x���l~b�l�3��R�9[�-͒F���            var firstLoadNum = 2 * pageSize;
                model.ListRecommend = list.Take(firstLoadNum).ToList();
                model.PageCount = firstLoadNum > list.Count ? 0 : Convert.ToInt32(Math.Ceiling((double)list.Count / pageSize));
            }

            return View(model);
        }
    }
}
